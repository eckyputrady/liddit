export interface Transaction {
  id: number;
  date: Date;
  description?: string;
  amount: number;
}

let id = 0;
let transactions: Transaction[] = [];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function create(
  data: Omit<Transaction, "id">
): Promise<Transaction> {
  await sleep(1000);
  const tx: Transaction = { ...data, id: id++ };
  transactions.push(tx);
  transactions.sort((a, b) => a.date.getTime() - b.date.getTime());
  return { ...tx };
}

export async function update(data: Transaction): Promise<Transaction> {
  await sleep(1000);
  transactions = transactions.map((tx) =>
    tx.id === data.id ? { ...data } : tx
  );
  return data;
}

export async function remove(id: number): Promise<Transaction | undefined> {
  await sleep(1000);
  const tx = transactions.find((tx: Transaction) => tx.id === id);
  if (!tx) {
    transactions = transactions.filter((x) => x !== tx);
  }
  return tx;
}

export interface FindParams {
  id?: number;
  dateMin?: Date;
  dateMax?: Date;
}

export async function find(params: FindParams): Promise<Transaction[]> {
  await sleep(1000);
  return transactions.filter((tx) => {
    if (params.id != undefined && params.id !== tx.id) {
      return false;
    }
    if (params.dateMin != undefined && params.dateMin > tx.date) {
      return false;
    }
    if (params.dateMax != undefined && params.dateMax < tx.date) {
      return false;
    }
    return true;
  });
}
