import { registerUser } from "@/lib/action";
import styles from "./register.module.css";
import RegisterForm from "@/components/registerForm/registerForm";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <RegisterForm />
        {/* <form action={registerUser}>
          <input type="text" placeholder="username" name="username" />
          <input type="text" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <input type="texarea" placeholder="Image Url" name="img" />
          <button>Register</button>
        </form> */}
      </div>
    </div>
  );
};

export default RegisterPage;
