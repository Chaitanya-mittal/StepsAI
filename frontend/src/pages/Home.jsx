import Button from "../components/Button";

function Home() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-10">
      <h1 className="font-sans text-3xl font-medium">
        Doctor-Patient Management System
      </h1>
      <div className="flex flex-col items-center gap-8 border p-8">
        <p className="font-serif text-xl text-stone-500">Welcome Doctor!!</p>
        <div className="flex items-center gap-4">
          <Button type="doctor" to="register">
            SignUp
          </Button>
          <Button type="patient" to="login">
            Login
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Home;
