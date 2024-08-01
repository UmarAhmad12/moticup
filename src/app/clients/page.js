"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import DataTable from "../../components/datatable";
import Modal from "../../components/modal";

function Client() {
  const [products, setProducts] = useState([
    {
      id: 1,
      image:
        "https://tse1.mm.bing.net/th?id=OIP.vR3c8gJDtTZuFFJLa3nHcwHaHC&pid=Api&P=0&h=180",
      name: "testClient",
      contact: "9508731352",
      status: "active",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    image: "",
    name: "",
    contact: "",
    status: "active",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleAddNewProduct = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setNewProduct({
      image: "",
      name: "",
      contact: "",
      status: "active",
    });
  };

  const handleSaveProduct = () => {
    if (isEditing) {
      setProducts(
        products.map((product) =>
          product.id === newProduct.id ? newProduct : product
        )
      );
    } else {
      const maxId = products.reduce(
        (max, product) => Math.max(max, product.id),
        0
      );
      setProducts([...products, { id: maxId + 1, ...newProduct }]);
    }
    setIsModalOpen(false);
    setNewProduct({
      image: "",
      name: "",
      contact: "",
      status: "active",
    });
  };

  const handleEditProduct = (product) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setNewProduct(product);
  };

  const handleDeleteProduct = (product) => {
    setProducts(products.filter((p) => p.id !== product.id));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const columns = [
    { Header: "#", accessor: "id" },
    {
      Header: "Image",
      accessor: "image",
      Cell: ({ value }) => (
        <img className="h-10 w-12 object-cover" alt="product" src={value} />
      ),
    },
    { Header: "Name", accessor: "name" },
    { Header: "Contact", accessor: "contact" },
    { Header: "Status", accessor: "status" },
  ];

  return (
    <>
      <div className="min-h-[90vh]">
        <div className="flex justify-between items-center p-4">
          <div className="text-black font-bold text-2xl p-2">All Clients</div>
          <div className="flex gap-1">
            <Button onClick={handleAddNewProduct} className="bg-blue-950">
              Add New Client
            </Button>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={products}
          editUrl={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out scale-95 p-6 w-full max-w-sm">
            <div className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Product" : "Add New Product"}
            </div>
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {newProduct.image && (
                <img
                  src={newProduct.image}
                  alt="New product"
                  className="h-20 w-24 object-cover"
                />
              )}
              <input
                type="text"
                placeholder="Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder="Contact"
                value={newProduct.contact}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, contact: e.target.value })
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <select
                value={newProduct.status}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, status: e.target.value })
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500"
              >
                Cancel
              </Button>
              <Button onClick={handleSaveProduct} className="bg-blue-950">
                {isEditing ? "Update" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Client;
