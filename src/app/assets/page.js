"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import DataTable from "../../../Layouts/datatable";
import Modal from "../../components/modal";
// import { getAssets } from "../../../services/assetsService";
// import { assetUrl } from "../../../services/config.json";
import { useRouter } from "next/navigation";

import DataTable from "@/components/datatable";
import { getAssets } from "../services/assetsService";
import Link from "next/link";

function Index() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAssetsData = async () => {
      try {
        const { data: response } = await getAssets();
        console.log("assetssss", response);
        const { data: products } = response;

        if (products.length > 0) {
          setProducts(products);
          // Assuming you have a loader state, set it here
          // setIsLoader(false);
        }
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          console.log("Server Busy");
        } else if (ex.response && ex.response.status === 404) {
          console.log("Server Down, Under maintenance.");
        } else {
          console.log("Unexpected Error");
        }
      }
    };

    fetchAssetsData();
  }, []);

  const handleEditProduct = (id) => {
    console.log("id", id);
    router.push(`/assets/${id}`);
  };

  // const handleProduct = (id) => {
  //   console.log("id", id);
  //   router.push(`/inspections/${id}`);
  // };

  // const handleDeleteProduct = (product) => {
  //   setProducts(products.filter((p) => p._id !== product._id));
  // };

  const getPhotoUrl = (value) => {
    console.log("photo", value[0]);

    if (value[0]) {
      return value[0].hasOwnProperty("url") ? value[0].url : "undefined";
    }
    return false;
  };

  const columns = [
    { Header: "#", accessor: "_id" },
    {
      Header: "Image",
      accessor: "photos",
      Cell: ({ value }) => (
        <img
          className="h-10 w-12 object-cover"
          alt="product"
          src={getPhotoUrl(value)}
        />
      ),
    },
    { Header: "Name", accessor: "name" },
    { Header: "Description", accessor: "description" },
    { Header: "Value", accessor: "value" },
    { Header: "Location", accessor: "location" },
    { Header: "Status", accessor: "status" },
  ];

  return (
    <>
      <div className="min-h-[90vh]">
        <div className="flex justify-between items-center p-4">
          <div className="text-black font-bold text-2xl p-2">All Assets</div>
          <div className="flex gap-1">
            <Link
              href="/assets/create"
              // onClick={() => router.push("/assets/create")}
              className="bg-blue-950"
            >
              Add New Assets
            </Link>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={products}
          editUrl="/assets/"
          inspectUrl="/inspections/"
          // onDelete={handleDeleteProduct}
        />
      </div>
    </>
  );
}

export default Index;
