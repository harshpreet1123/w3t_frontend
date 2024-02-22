import { useState } from "react";
import styles from "../styles/Home.module.css";
import { STATUS_CONTRACT_ADDRESS } from "../constants/addresses";
import Link from "next/link";
import { truncateAddress } from "../utils/truncateAddress";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
  useDisconnect,
} from "@thirdweb-dev/react";

export default function UserStatus() {
  const address = useAddress();
  const disconnect = useDisconnect();

  const [newStatus, setNewStatus] = useState("");
  const [isStatusModelOpen, setIsStatusModelOpen] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const characterDecoration =
    characterCount > 140
      ? styles.characterCountOver
      : styles.characterCountUnder;

  const { contract } = useContract(STATUS_CONTRACT_ADDRESS);
  const { data: myStatus, isLoading: isMyStatusLoading } = useContractRead(
    contract,
    "getStatus",
    [address]
  );

  if (address == null) {
    return (
      <div>
        <ConnectWallet modalSize="compact" />
        <p>Connect your wallet to Continue</p>
      </div>
    );
  }

  return (
    <div className={styles.userContainer}>
      <div className={styles.statusHeader}>
        <Link href={`/account/${address}`} style={{ color: "white" }}>
          <p className={styles.connectedAddress}>{truncateAddress(address)}</p>
        </Link>
        <button className={styles.logoutButton} onClick={() => disconnect()}>
          Disconncet
        </button>
      </div>
      {!isMyStatusLoading && myStatus && (
        <div>
          <p className={styles.statusText}>{myStatus}</p>
        </div>
      )}
      <button
        className={styles.updateButton}
        onClick={() => setIsStatusModelOpen(true)}
      >
        Update
      </button>

      {!isStatusModelOpen && (
        <div className={styles.statusModalContainer}>
          <div className={styles.statusModal}>
            <div className={styles.statusModalHeader}>
              <p>New Status: </p>
              <button
                className={styles.logoutButton}
                onClick={() => setIsStatusModelOpen(false)}
              >
                Close
              </button>
            </div>
            <textarea
              value={newStatus}
              onChange={(e) => {
                setNewStatus(e.target.value);
                setCharacterCount(e.target.value.length);
              }}
              placeholder="What's on your mind."
            />
            <div className={styles.characterCounterContainer}>
              <p className={characterDecoration}>{characterCount}/140</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
