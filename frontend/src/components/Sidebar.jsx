
const Sidebar=()=>{
    return(
        <div id="sidebar">
            <h2 id="logodiv">Dash</h2>
            <p id='sidebar-heading'>Menu</p>
            <ul className='sidebar-list'>
                <li>Dashboard</li>
                <li>Food Order</li>
                <li>Manage Menu</li>
                <li>Customer Review</li>
            </ul>
            <p id='sidebar-heading'>Others</p>
            <ul className='sidebar-list'>
                <li>Settings</li>
                <li>Payment</li>
                <li>Account</li>
                <li>Help</li>
            </ul>
        </div>
    )
}

export default Sidebar;