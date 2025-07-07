import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useProduct } from '../../../auth/ProductProvider';
import '../../../assets/styles/UploadProducts.css';

const ProductForm: React.FC = () => {
  const { createProduct } = useProduct();

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      category: 'comida',
      img: null as File | null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Nombre es requerido'),
      description: Yup.string().required('Descripción es requerida'),
      price: Yup.number().required('Precio es requerido').min(0, 'El precio no puede ser negativo'),
      quantity: Yup.number().required('Cantidad es requerida').min(0, 'La cantidad no puede ser negativa'),
      category: Yup.mixed().oneOf(['comida', 'bebida', 'postre'], 'Categoría inválida').required('Categoría es requerida'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('price', values.price.toString());
      formData.append('quantity', values.quantity.toString());
      formData.append('category', values.category);
      
      if (values.img) {
        formData.append('img', values.img);
      }

      try {
        await createProduct({
          id: values.id,
          name: values.name,
          description: values.description,
          price: values.price,
          imageUrl: '',
        });
        alert('Producto creado con éxito');
      } catch (error) {
        console.error('Error al crear el producto:', error);
        alert('Error al crear el producto');
      }
    },
  });

  return (
    <div className="form-container">
      <form onSubmit={formik.handleSubmit}>
        <h1>Crear Productos</h1>
        
        <div>
          <label htmlFor="id">ID</label>
          <input
            id="id"
            name="id"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.id}
          />
        </div>

        <div>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>

        <div>
          <label htmlFor="description">Descripción</label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="error">{formik.errors.description}</div>
          )}
        </div>

        <div>
          <label htmlFor="price">Precio</label>
          <input
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
          {formik.touched.price && formik.errors.price && (
            <div className="error">{formik.errors.price}</div>
          )}
        </div>

        <div>
          <label htmlFor="quantity">Cantidad</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.quantity}
          />
          {formik.touched.quantity && formik.errors.quantity && (
            <div className="error">{formik.errors.quantity}</div>
          )}
        </div>

        <div>
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            name="category"
            onChange={formik.handleChange}
            value={formik.values.category}
          >
            <option value="comida">Comida</option>
            <option value="bebida">Bebida</option>
            <option value="postre">Postre</option>
          </select>
          {formik.touched.category && formik.errors.category && (
            <div className="error">{formik.errors.category}</div>
          )}
        </div>

        <div>
          <label htmlFor="img">Imagen</label>
          <input
            id="img"
            name="img"
            type="file"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0] || null;
              formik.setFieldValue('img', file);
            }}
          />
        </div>

        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};

export default ProductForm;
