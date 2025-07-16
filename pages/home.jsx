import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className='contaner'>
             <h1 className="text-center mb-4" style={{ color: '#0d6efd' }}>GPA Calculator</h1>
            <div className='card bg-dark text-white border-light p-4 shadow'>
                <h2 className='text-primary'>Welcome to the GPA Calculator</h2>
                <p className='text-white'>This application helps you calculate your GPA easily.</p>
                <p className='text-white'>Start calculating your GPA now with just a few clicks. It's fast, and accurate.</p>
            </div>

            <div className='card bg-dark text-white border-light p-4 shadow mt-4'>
                <h3 className='text-primary'>How It Works</h3>
                <ul className='text-white'>
                    <li>Enter your courses with credit hours and grades.</li>
                    <li>The app allow you to calculate your semester and cumulative GPA instantly.</li>
                    <li>You can modify, or reset your calculations anytime.</li>
                    </ul>
                    <div className='mt-4'>
                        <Link to="/calc" className='btn btn-primary'>Go to Calculator</Link>
                    </div>
                   </div>
                 </div>

    );
}


export default Home;
