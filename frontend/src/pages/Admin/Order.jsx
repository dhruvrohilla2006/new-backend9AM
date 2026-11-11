import { useEffect } from "react";
import orderStore from "../../store/orderStore";

import React, { useState } from "react";

export function OrderTable({ orders }) {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (orderId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const getStatusBadge = (status) => {
    const styles = {
      accepted: { bg: "#e6f4ea", color: "#137333", border: "#ceead6" },
      pending: { bg: "#fef7e0", color: "#b06000", border: "#feefc3" },
      rejected: { bg: "#fce8e6", color: "#c5221f", border: "#fad2cf" },
    };
    const current = styles[status?.toLowerCase()] || {
      bg: "#f1f3f4",
      color: "#3c4043",
      border: "#dadce0",
    };

    return (
      <span
        style={{
          display: "inline-block",
          padding: "4px 10px",
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: "600",
          textTransform: "capitalize",
          backgroundColor: current.bg,
          color: current.color,
          border: `1px solid ${current.border}`,
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <div style={{ width: "100%", overflowX: "auto", fontFamily: "sans-serif" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
          textAlign: "left",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#f8f9fa",
              borderBottom: "2px solid #dee2e6",
            }}
          >
            <th style={{ padding: "12px 16px", width: "40px" }}></th>
            <th style={{ padding: "12px 16px" }}>Order ID</th>
            <th style={{ padding: "12px 16px" }}>Customer</th>
            <th style={{ padding: "12px 16px" }}>Total Items</th>
            <th style={{ padding: "12px 16px" }}>Total Price</th>
            <th style={{ padding: "12px 16px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => {
            const isExpanded = !!expandedRows[order._id];
            const totalQty =
              order.cartItem?.reduce((sum, item) => sum + item.quantity, 0) ||
              0;

            return (
              <React.Fragment key={order._id}>
                <tr
                  onClick={() => toggleRow(order._id)}
                  style={{
                    borderBottom: "1px solid #dee2e6",
                    cursor: "pointer",
                    backgroundColor: isExpanded ? "#f8f9fa" : "#ffffff",
                    transition: "background-color 0.15s ease",
                  }}
                >
                  <td style={{ padding: "12px 16px", color: "#5f6368" }}>
                    {isExpanded ? "▼" : "▶"}
                  </td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace" }}>
                    {order._id}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div>
                      <strong>{order.userId?.name}</strong>
                    </div>
                    <div style={{ fontSize: "12px", color: "#6c757d" }}>
                      {order.userId?.email}
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    {order.cartItem?.length} ({totalQty} units)
                  </td>
                  <td style={{ padding: "12px 16px", fontWeight: "600" }}>
                    ₹{order.totalprice}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    {getStatusBadge(order.status)}
                  </td>
                </tr>

                {/* Expanded Details Row */}
                {isExpanded && (
                  <tr
                    style={{
                      backgroundColor: "#fafafa",
                      borderBottom: "1px solid #dee2e6",
                    }}
                  >
                    <td colSpan="6" style={{ padding: "16px 24px" }}>
                      <h4
                        style={{
                          margin: "0 0 12px 0",
                          fontSize: "14px",
                          color: "#333",
                        }}
                      >
                        Ordered Items ({order.cartItem?.length})
                      </h4>
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          backgroundColor: "#ffffff",
                          border: "1px solid #e9ecef",
                          borderRadius: "4px",
                        }}
                      >
                        <thead>
                          <tr
                            style={{
                              backgroundColor: "#f1f3f5",
                              borderBottom: "1px solid #e9ecef",
                            }}
                          >
                            <th
                              style={{ padding: "8px 12px", fontSize: "12px" }}
                            >
                              Image
                            </th>
                            <th
                              style={{ padding: "8px 12px", fontSize: "12px" }}
                            >
                              Item Name
                            </th>
                            <th
                              style={{ padding: "8px 12px", fontSize: "12px" }}
                            >
                              Category
                            </th>
                            <th
                              style={{ padding: "8px 12px", fontSize: "12px" }}
                            >
                              Unit Price
                            </th>
                            <th
                              style={{ padding: "8px 12px", fontSize: "12px" }}
                            >
                              Qty
                            </th>
                            <th
                              style={{ padding: "8px 12px", fontSize: "12px" }}
                            >
                              Subtotal
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.cartItem?.map((cart) => (
                            <tr
                              key={cart._id}
                              style={{ borderBottom: "1px solid #f1f3f5" }}
                            >
                              <td style={{ padding: "8px 12px" }}>
                                <img
                                  src={cart.item_id?.images?.[0]}
                                  alt={cart.item_id?.name}
                                  style={{
                                    width: "42px",
                                    height: "42px",
                                    objectFit: "cover",
                                    borderRadius: "4px",
                                    display: "block",
                                  }}
                                />
                              </td>
                              <td style={{ padding: "8px 12px" }}>
                                <strong>{cart.item_id?.name}</strong>
                                <div
                                  style={{
                                    fontSize: "11px",
                                    color: "#6c757d",
                                    maxWidth: "280px",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                  title={cart.item_id?.description}
                                >
                                  {cart.item_id?.description}
                                </div>
                              </td>
                              <td
                                style={{
                                  padding: "8px 12px",
                                  textTransform: "uppercase",
                                  fontSize: "12px",
                                }}
                              >
                                {cart.item_id?.category}
                              </td>
                              <td style={{ padding: "8px 12px" }}>
                                ₹{cart.item_id?.price}
                              </td>
                              <td style={{ padding: "8px 12px" }}>
                                {cart.quantity}
                              </td>
                              <td
                                style={{
                                  padding: "8px 12px",
                                  fontWeight: "500",
                                }}
                              >
                                ₹{(cart.item_id?.price || 0) * cart.quantity}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const Order = () => {
  const { getOrdersAdmin, orderData } = orderStore();
  useEffect(() => {
    (async function () {
      const result = await getOrdersAdmin();

      console.log(result);
    })();
  }, [getOrdersAdmin]);
  console.log("Hello");
  return (
    <div className="space-y-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
        Fresh & Delicious
      </p>
      <OrderTable orders={orderData} />
    </div>
  );
};

export default Order;
