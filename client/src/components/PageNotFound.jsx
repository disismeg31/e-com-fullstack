import './PageNotFound.css';
function PageNotFound() {
  return (
    <div><section className="page_404">
  <div className="container">
    <div className="custom-row">
      <div className="custom-col-12">
        <div className="custom-col-10 custom-offset-1 custom-text-center">
          <div className="four_zero_four_bg">
            <h1 className="custom-text-center">404</h1>

          </div>

          <div className="contant_box_404">
            <h3 className="h2">
              Look like you&nbsp;re lost
            </h3>

            <p>the page you are looking for not avaible!</p>

            {/* <a href="" className="link_404">Go to Home</a> */}
          </div>
        </div>
      </div>
    </div>
  </div>
</section></div>
  )
}

export default PageNotFound