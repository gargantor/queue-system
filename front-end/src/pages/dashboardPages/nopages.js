import React from 'react';

export default function NoPages() {
  return (
    <div>
        <section className="content-header">
            <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                <h1>404 Error Page</h1>
                </div>
                <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/#">Home</a></li>
                    <li className="breadcrumb-item active">404 Error Page</li>
                </ol>
                </div>
            </div>
            </div>
        </section>
        <section className="content">
            <div className="error-page">
            <h2 className="headline text-warning"> 404</h2>
            <div className="error-content">
                <h3><i className="fas fa-exclamation-triangle text-warning" /> Oops! Page not found.</h3>
                <p>
                We could not find the page you were looking for.
                
                </p>
                
            </div>
            {/* /.error-content */}
            </div>
            {/* /.error-page */}
        </section>
    </div>

  );
}
