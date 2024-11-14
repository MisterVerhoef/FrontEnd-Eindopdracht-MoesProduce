import './LoginPage.css'
import Login from '../../components/Login/Login.jsx'

function LoginPage() {


    return (
        <section className="inner-container">
            <article className="inner-loginForm-container" id="login-container">
                <header>
                    <h1>Login</h1>
                </header>
                <Login/>
            </article>
        </section>
    );
}

export default LoginPage;