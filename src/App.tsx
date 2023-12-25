import Header from "./components/Header/Header";
import Calendar from "./components/Calendar/Calendar";
// import Test from "./components/Test";

function App() {
    return (
        <div className='app'>
            <Header />
            <Calendar year={2023} month={12} />
            {/* <Test /> */}
        </div>
    );
}

export default App;
