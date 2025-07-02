const Cardlist = ({ data = [] }) => {
  console.log('CardList recibió datos:', data);
  console.log('Cantidad de elementos:', data.length);
  
  if (data.length === 0) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <h3>Cargando perritos...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Perritos ({data.length})</h2>
      <div className="row">
        {data.map((item) => {
          const { id, name, power, type, image } = item;
          console.log(`Renderizando perrito: ${name}, imagen: ${image}`);
          
          return (
            <div key={id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img 
                  src={image || 'https://via.placeholder.com/150'} 
                  alt={name} 
                  className="card-img-top"
                  style={{ 
                    height: '200px', 
                    objectFit: 'cover' 
                  }}
                  onError={(e) => {
                    console.error(`Error cargando imagen: ${image}`);
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">
                    <strong>Raza:</strong> {type || 'Desconocida'}
                  </p> 
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cardlist;