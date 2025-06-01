const RegistrationForm = () => {
  return (
    <div className='row mt-2'>
      <div className='col-sm-12'>
        <div className='card p-3 border-0 shadow-sm'>
          <div className='card-body'>
            <h2 className='text-center'>Registration Form</h2>
            <form>
              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input type='text' className='form-control' id='username' />
              </div>
              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input type='text' className='form-control' id='username' />
              </div>
              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input type='text' className='form-control' id='username' />
              </div>
              <button type='submit' className='btn btn-primary mt-2'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
