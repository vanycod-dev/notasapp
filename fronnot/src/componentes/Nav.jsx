import Links from "./Links";

function Nav() {
    return ( 
        <>
            <header className='w-full bg-gray-800 text-white p-4 flex justify-between items-center'>
            <h1 className='font-bold font-sans text-xl'>Notas App</h1>

            <div className='font-bold px-1.5 py-0.5 text-lg relative hover:bg-gray-600 rounded cursor-pointer'>☰</div>
            
            <div className='w-2xs flex flex-col text-gray-800 text-base bg-gray-300 absolute top-16 right-0 rounded-b-lg shadow-lg py-2 text-center z-10'>
                <Links to='/login' text='Inciar Sesion' />
                <Links to='/registro' text='Registro' />
                <Links to='/lista' text='Lista Notas' />
                <Links to='/notas' text='Crear notas' />
                <Links to='/Info' text='Info' />
            </div>
        </header>
        </>
     );
}

export default Nav;