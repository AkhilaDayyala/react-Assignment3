import React, { useState, useEffect } from 'react';


export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/movies')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/favourites')
            .then(result => result.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setFavourites(data);
                } else {
                    console.error('Expected an array but got', data);
                    setFavourites([]);
                }
            })
            .catch(error => {
                console.log('Error fetching favourites:', error);
                setFavourites([]);
            });
    }, []);

    const addToFavourites = (product) => {
        if (!product || !product.id) {
            console.error('Invalid product:', product);
            return;
        }

        const isAlreadyFavourite = favourites.find(fav => fav.id === product.id);
        if (isAlreadyFavourite) {
            alert('Product is already in favourites');
            return;
        }

        const updatedFavourites = [...favourites, product];
        setFavourites(updatedFavourites);

        fetch('http://localhost:3000/favourites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).catch(error => console.log('Error adding to favourites:', error));
    };

    const removeFromFavourites = (product) => {
        if (!product || !product.id) {
            console.error('Invalid product:', product);
            return;
        }

        const updatedFavourites = favourites.filter(fav => fav.id !== product.id);
        setFavourites(updatedFavourites);

        fetch(`http://localhost:3000/favourites/${product.id}`, {
            method: 'DELETE'
        }).catch(error => console.log('Error removing from favourites:', error));
    };

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-6'>
                        <h3 style={{marginRight:'280px',color:'tomato'}}>MovieList</h3>
                        {products.map((product) => (
                            <div key={product.id} className="card" style={{ width: '18rem'}}>
                                <img src={product.image} className="card-img-top" alt={product.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">{product.releaseDate}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => addToFavourites(product)}
                                    >
                                        Add to Favourites
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='col-lg-6'>
                        <h3 style={{marginRight:'280px', color:'blue'}}>FavouriteList</h3>
                        {favourites.map((fav) => (
                            <div key={fav.id} className="card" style={{ width: '18rem' }}>
                                <img src={fav.image} className="card-img-top" alt={fav.image} />
                                <div className="card-body">
                                    <h5 className="card-title">{fav.title}</h5>
                                    <p className="card-text">{fav.releaseDate}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => removeFromFavourites(fav)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
