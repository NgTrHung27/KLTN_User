import { auth, signOut } from "@/auth";
import { ModeToggle } from "@/components/theme-switcher";

const StudentPage = async () => {
  const session = await auth();

  return (
    <div className="h-full w-full">
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
      <ModeToggle />
    </div>
  );
};

export default StudentPage;
