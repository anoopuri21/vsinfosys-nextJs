import { AdminWorkspace } from "@/components/admin-workspace";
export const metadata = {
  title: "CMS Admin",
  robots: { index: false, follow: false },
};
export default function Admin() {
  return (
    <main className="adminPage">
      <AdminWorkspace />
    </main>
  );
}
