import transactionServices from "@/services/transaction";
import { useEffect, useState } from "react";

const OrderAdminView = () => {
  const [transactions, setTransactions] = useState([]);

  const getAllTransaction = async () => {
    const { data } = await transactionServices.getAllTransaction();
    const results = data.data;
    setTransactions(results);
  };

  console.log(transactions);

  useEffect(() => {
    getAllTransaction();
  }, []);
  return (
    <div>
      <div>Orderan</div>
      {transactions.map((transaction: any, index) => (
        <div key={index}>{transaction.order_id}</div>
      ))}
    </div>
  );
};

export default OrderAdminView;
