

function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container ">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h3 className="h5 mb-3">About Us</h3>
            <p className="">PaperCraft is your destination for premium stationery and writing supplies.</p>
          </div>
          <div className="col-md-4 mb-3 mb-md-0 ">
            <h3 className="h5 mb-3">Quick Links</h3>
            <ul className="list-unstyled ">
              <li>
                <a href="#" className="link-light text-decoration-none">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="link-light text-decoration-none">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="link-light text-decoration-none">
                  Returns
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h3 className="h5 mb-3">Contact Us</h3>
            <p className=" mb-1">Email: info@papercraft.com</p>
            <p className="">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-4 text-center ">
          <p>&copy; 2023 PaperCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer