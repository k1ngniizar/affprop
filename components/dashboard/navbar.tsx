type Props = {
  user: {
    name?: string | null;
    email?: string | null;
  };
};

export default function DashboardNavbar({ user }: Props) {
  return (
    <header className="border-b border-zinc-700 p-4 flex justify-between bg-black rounded-t-sm">
      <h1 className="font-semibold">Dashboard</h1>

      <p>{user.email}</p>
    </header>
  );
}
