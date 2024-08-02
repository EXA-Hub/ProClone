import React, { useEffect, useState } from "react";
import Image from "next/image";
import "@/styles/credits.css";
import { apiClient } from "@/utils/apiClient";
import Pagination from "@/components/Pagination";

interface TransType {
  Date: number;
  Amount: number;
  Balance: number;
  User: {
    username: string;
    avatar: string;
  };
  Reason?: string;
}

interface DataType {
  enrichedLogs: TransType[];
  pages: number;
}

const Transactions: React.FC = () => {
  const [Trans, setTrans] = useState<TransType | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [Data, setData] = useState<DataType | undefined>();

  useEffect(() => {
    apiClient("/backend/api/log/credits?page=" + (currentPage - 1), "get").then(
      (res) => {
        if (res.success) setData(res.data);
      }
    );
  }, [currentPage]);

  return (
    <section className="dashboard-container ">
      <div className="component">
        <div className="component-container">
          <div style={{ opacity: 1 }}>
            {Trans && (
              <div className="ReactModalPortal">
                <div
                  className="ReactModal__Overlay ReactModal__Overlay--after-open"
                  style={{
                    position: "fixed",
                    inset: "0px",
                    backgroundColor: "rgba(255, 255, 255, 0.75)",
                  }}
                  onClick={() => setTrans(undefined)} // Close modal when clicking outside
                >
                  <div
                    className="ReactModal__Content ReactModal__Content--after-open smallModal bg-modal"
                    tabIndex={-1}
                    role="dialog"
                    aria-label="more information"
                    aria-modal="true"
                    onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing
                  >
                    <div id="transactions-model-parent" className="ltr">
                      <div className="Modalhead">
                        <Image
                          src={Trans.User.avatar} // Use dynamic avatar URL
                          className="trans-avatar"
                          alt={Trans.User.username}
                          width={40}
                          height={40}
                        />
                        <div className="transactions-model-user" dir="ltr">
                          <h5>
                            {Trans.User.username}
                            <div>
                              <span>#</span>
                              <span>0000</span>
                            </div>
                          </h5>
                        </div>
                      </div>
                      <div className="row modalDram">
                        <div className="transactions-modal-reason">
                          <h5>Reason</h5>
                          <p>{Trans.Reason || "لم يتم تقديم سبب"}</p>{" "}
                          {/* Use dynamic reason */}
                        </div>
                        <div className="transactions-modal-reason">
                          <h5>USER ID</h5>
                          <p>{Trans.User.username}</p>{" "}
                          {/* Use dynamic user ID */}
                        </div>
                        <div className="transactions-modal-reason">
                          <h5>Amount</h5>
                          <p />
                          <p
                            dir="ltr"
                            className={
                              (Trans.Amount > 0 ? "plus" : "negative") +
                              " d-flex align-items-center"
                            }
                          >
                            <i className="fa-solid fa-cedi-sign me-1" />
                            {Trans.Amount > 0 ? "+" : ""}
                            {Trans.Amount}
                          </p>
                          <p />
                        </div>
                        <div className="transactions-modal-reason">
                          <h5>Balance</h5>
                          <p className="d-flex gap-2 align-items-center">
                            {Trans.Balance}
                            <i
                              className={`fa-solid ${
                                Trans.Amount > 0
                                  ? "fa-angle-up"
                                  : "fa-angle-down"
                              }`}
                            />
                          </p>
                        </div>
                      </div>
                      <div className="transactions-modal-footer">
                        <p>{new Date(Trans.Date).toLocaleString()}</p>{" "}
                        {/* Convert milliseconds to date */}
                        <button
                          className="btn btn-green"
                          onClick={() => setTrans(undefined)}
                        >
                          {" "}
                          {/* Close modal on button click */}
                          done
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div id="transactions_container__E67JK" className=" ">
              <table className="transactions_table__Ge1Ih">
                <thead>
                  <tr className="transactions_head__u6q1O">
                    <th>User</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {Data &&
                    Data.enrichedLogs.map((transaction, index) => (
                      <tr
                        onClick={() => {
                          setTrans(transaction);
                        }}
                        key={index}
                        className="transactions_user__NkBQY pointer transactions_border-bottom__2NUQP"
                      >
                        <td>
                          <div className="transactions_user-info__lW_MB">
                            <Image
                              width={40}
                              height={40}
                              src={transaction.User.avatar}
                              alt={transaction.User.username}
                            />
                            <p className="ms-2">
                              {transaction.User.username}{" "}
                              <span className="text-muted">
                                <span>#</span>
                                <span>0000</span>
                              </span>
                            </p>
                          </div>
                        </td>
                        <td>
                          <div className="transactions_user-date__zoRT0">
                            {new Date(transaction.Date).toLocaleString()}
                          </div>
                        </td>
                        <td>
                          <div className="transactions_user-credits__tevdX d-flex align-items-center">
                            <p
                              dir="ltr"
                              className={`align-items-center ${
                                transaction.Amount > 0 ? "plus" : "negative"
                              }`}
                            >
                              <i className="fa-solid fa-cedi-sign me-1" />
                              {transaction.Amount > 0 ? "+" : ""}
                              {transaction.Amount}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div className="transactions_user-balance__9IhCi">
                            {transaction.Balance}
                            <i
                              className={`fa-solid ${
                                transaction.Amount > 0
                                  ? "fa-angle-up"
                                  : "fa-angle-down"
                              }`}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {Data && (
              <Pagination
                totalPages={Data.pages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
          <div style={{ height: "100px" }} />
        </div>
      </div>
    </section>
  );
};

export default Transactions;
