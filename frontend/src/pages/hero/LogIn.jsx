export default function LogIn() {
  return (
    <section>
      <h2>Log in</h2>

      <form action="http://localhost:8080/api/users/auth" method="post">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="enter your password"
            required
          />
        </div>
      </form>
    </section>
  );
}
