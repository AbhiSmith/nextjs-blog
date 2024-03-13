import { sayHello } from "@/lib/action";

const ServerActionTestPage = () => {
  return (
    <div>
      <form action={sayHello}>
        <button>Test Me</button>
      </form>
    </div>
  );
};

export default ServerActionTestPage;
