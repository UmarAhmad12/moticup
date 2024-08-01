"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DataTable from "../../components/datatable";
import Modal from "../../components/modal";

import { useRouter } from "next/navigation";
import { getInspection } from "../services/inspectionService";

function Index() {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchInspectionsData = async () => {
      try {
        const { data: response } = await getInspection();
        // console.log("inspection", response);
        const { data: inspections } = response;

        if (inspections.length > 0) {
          console.log("inspections", inspections);

          setData(inspections);
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

    fetchInspectionsData();
  }, []);

  const handleEditProduct = (id) => {
    console.log("id", id);
    router.push(`/assets/${id}/edit`);
  };

  const handleProduct = (id) => {
    console.log("id", id);
    router.push(`/assets/${id}/view`);
  };

  const handleDeleteProduct = (product) => {
    setProducts(products.filter((p) => p._id !== product._id));
  };

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
    { Header: "Asset Name", accessor: "asset.name" },
    { Header: "Owner Id", accessor: "asset.owner_id" },
    { Header: "Location", accessor: "asset.location" },
    { Header: "Ins. Date", accessor: "inspection_date" },
  ];

  return (
    <>
      <div className="min-h-[90vh]">
        <div className="flex justify-between items-center p-4">
          <div className="text-black font-bold text-2xl p-2">
            All Inspections
          </div>
          <div className="flex gap-1">
            <Button
              // to="/products/create"
              onClick={() => router.push("/inspections/create")}
              className="bg-blue-950"
            >
              Add New Inspection
            </Button>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={data}
          editUrl={handleEditProduct}
          onInspect={handleProduct}
          // onDelete={handleDeleteProduct}
        />
      </div>
    </>
  );
}

export default Index;
