import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import * as service from "./TransactionService";

export const transactionSchema = z.object({
  id: z.number().optional(),
  date: z.date(),
  description: z.string().optional(),
  amount: z.number().refine((i) => i !== 0, {
    message: "Must not be zero",
  }),
});
export type Transaction = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  input?: Transaction;
  handleSubmit?: (d: Transaction) => Promise<void>;
}

export const TransactionForm = (props: TransactionFormProps) => {
  const {
    register,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    handleSubmit,
  } = useForm<Transaction>({
    values: props.input,
    mode: "onBlur",
    resolver: zodResolver(transactionSchema),
  });
  const onSubmit = handleSubmit(async (d) => {
    if (props.handleSubmit) {
      await props.handleSubmit(d);
      reset();
    }
  });
  return (
    <form onSubmit={onSubmit}>
      <h1>Transaction form</h1>
      <fieldset>
        <label>Date</label>
        <input
          type="date"
          {...register("date", { required: true, valueAsDate: true })}
        ></input>
        {errors.date && <p>{errors.date.message}</p>}
      </fieldset>
      <fieldset>
        <label>Amount</label>
        <input
          type="number"
          {...register("amount", { required: true, valueAsNumber: true })}
        ></input>
        {errors.amount && <p>{errors.amount.message}</p>}
      </fieldset>
      <fieldset>
        <label>Description</label>
        <input {...register("description", { required: true })}></input>
        {errors.description && <p>{errors.description.message}</p>}
      </fieldset>
      <button disabled={isSubmitting}>Submit</button>
      {isSubmitSuccessful && <p>Submitted successfully!</p>}
    </form>
  );
};

interface TransactionListItemProps {
  data: Transaction;
  handleEdit?: (d: Transaction) => Promise<void>;
  handleDelete?: (d: Transaction) => Promise<void>;
}

export const TransactionListItem = (props: TransactionListItemProps) => {
  return (
    <div>
      <p>{props.data.date.toISOString()}</p>
      <h2>{props.data.amount}</h2>
      <p>{props.data.description}</p>
      <button onClick={() => props.handleEdit?.(props.data)}>Edit</button>
      <button onClick={() => props.handleDelete?.(props.data)}>Delete</button>
    </div>
  );
};

export const TransactionCrud = () => {
  const { txs, editingTx, handleNew, handleDelete, handleEdit, handleSubmit } =
    useTransactionCrud();

  return (
    <>
      {editingTx && (
        <TransactionForm input={editingTx} handleSubmit={handleSubmit} />
      )}
      <div>
        <button onClick={handleNew}>New</button>
      </div>
      {txs.map((d) => (
        <TransactionListItem
          key={d.id}
          data={d}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
};

export const useTransactionCrud = () => {
  const [txs, setTxs] = useState<Transaction[]>([]);
  const [editingTx, setEditingTx] = useState<Transaction | undefined>(
    undefined
  );

  useEffect(() => {
    loadData();
  }, []);

  async function handleNew() {
    setEditingTx({
      id: undefined,
      description: undefined,
      date: new Date(),
      amount: 0,
    });
  }

  async function handleEdit(tx: Transaction) {
    setEditingTx(tx);
  }

  async function handleDelete(tx: Transaction) {
    if (tx.id) {
      await service.remove(tx.id);
      loadData();
    }
  }

  async function handleSubmit(tx: Transaction) {
    if (tx.id) {
      await service.update({ ...tx, id: tx.id });
    } else {
      await service.create(tx);
    }
    loadData();
    setEditingTx(undefined);
  }

  async function loadData() {
    const txs = await service.find({});
    setTxs(txs);
  }

  return {
    txs,
    editingTx,
    handleNew,
    handleEdit,
    handleDelete,
    handleSubmit,
  };
};
