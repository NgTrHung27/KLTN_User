import { auth, signOut } from "@/auth";
import { ModeToggle } from "@/components/theme-switcher";
import { Lang, getDictionary } from "@/data/dictionaries";

const StudentPage = async ({
  params: { lang },
}: {
  params: { lang: Lang };
}) => {
  const session = await auth();
  const dict = await getDictionary(lang);

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
      <ModeToggle dict={dict} />
    </div>
  );
};

export default StudentPage;
