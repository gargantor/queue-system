import React from 'react';

export default function Content1() {
  return (
    <div>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Blank Page</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="/#">Home</a></li>
                  <li className="breadcrumb-item active">Content 1</li>
                </ol>
              </div>
            </div>
          </div>{/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          {/* Default box */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Content 1</h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i className="fas fa-minus" /></button>
                <button type="button" className="btn btn-tool" data-card-widget="remove" data-toggle="tooltip" title="Remove">
                  <i className="fas fa-times" /></button>
              </div>
            </div>
            <div className="card-body">
              Start creating your amazing application!
            </div>
            {/* /.card-body */}
            <div className="card-footer">
              Footer
            </div>
            {/* /.card-footer*/}
          </div>
          {/* /.card */}
        </section>
        {/* /.content */}
        </div>
  );
}
