// import LoginForm from "@/components/loginForm/loginForm";
import { handleGithubLogin } from "@/lib/action";
// import { auth, signIn } from "@/lib/auth";
import styles from "./login.module.css";

const LoginPage = async () => {
  //   const session = await auth();
  //   // console.log(session);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGithubLogin}>
          <button className={styles.github}>Login with Github</button>
        </form>
        {/* <LoginForm /> */}
      </div>
    </div>
  );
};

export default LoginPage;
