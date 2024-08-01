"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { createAssets } from "../../services/assetsService";

function CreateAssets() {
  const [previewImage, setPreviewImage] = useState("");
  const [assetsData, setAssetsData] = useState({
    name: "",
    type: "",
    description: "",
    value: "",
    location: "",
    owner_id: "",
    assigned_to_id: "",
    engine_capacity: "",
    mileage: "",
    fuel_tank_capacity: "",
    variant: "",
    last_maintenance_date: "",
    next_maintenance_date: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    console.log("typed", value);
    setAssetsData({
      ...assetsData,
      [name]: value,
    });
  }

  function getImage(event) {
    event.preventDefault();
    const uploadImage = event.target.files[0];
    console.log("image", uploadImage);

    if (uploadImage) {
      setAssetsData({
        ...assetsData,
        photos: uploadImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.onload = function () {
        setPreviewImage(fileReader.result);
      };
    }
  }

  async function createNewAccount(event) {
    event.preventDefault();
    try {
      if (
        !assetsData.name ||
        !assetsData.type ||
        !assetsData.description ||
        !assetsData.value ||
        !assetsData.location ||
        !assetsData.owner_id ||
        !assetsData.engine_capacity ||
        !assetsData.mileage ||
        !assetsData.fuel_tank_capacity ||
        !assetsData.variant ||
        !assetsData.last_maintenance_date ||
        !assetsData.next_maintenance_date
      ) {
        console.log("Error occured during the validation.");
        toast.error("Please fill all the details");
        return;
      }

      const formData = new FormData();
      formData.append("name", assetsData.name);
      formData.append("type", assetsData.type);
      formData.append("description", assetsData.description);
      formData.append("value", assetsData.value);
      formData.append("location", assetsData.location);
      formData.append("owner_id", "66a0b47fddbdd1103d18372b");
      formData.append("assigned_to_id", assetsData.assigned_to_id || "");
      formData.append("features[Engine Capacity]", assetsData.engine_capacity);
      formData.append("features[Mileage]", assetsData.mileage);
      formData.append(
        "features[Fuel Tank Capacity]",
        assetsData.fuel_tank_capacity
      );
      formData.append("features[Variant]", assetsData.variant);
      formData.append(
        "dates[Last Maintenance Date]",
        assetsData.last_maintenance_date
      );
      formData.append(
        "dates[Next Maintenance Date]",
        assetsData.next_maintenance_date
      );
      if (assetsData.photos) {
        formData.append("photos", assetsData.photos);
      }

      const { data: res } = await createAssets(formData);
      console.log("response", res);

      setAssetsData({
        name: "",
        type: "",
        description: "",
        value: "",
        location: "",
        owner_id: "",
        assigned_to_id: "",
        engine_capacity: "",
        mileage: "",
        fuel_tank_capacity: "",
        variant: "",
        last_maintenance_date: "",
        next_maintenance_date: "",
      });
      setPreviewImage("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create asset");
    }
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center min-h-screen p-4 gap-4">
        {/* Heading for xs screens */}
        <h1 className="text-center text-2xl font-bold block lg:hidden mb-4">
          Create Assets
        </h1>

        {/* Left Section */}
        <div className="w-full max-w-lg lg:max-w-none lg:flex-1 lg:w-1/3 flex flex-col items-center gap-4">
          <label
            htmlFor="image_uploads"
            className="cursor-pointer flex justify-center"
          >
            {previewImage ? (
              <img
                className="w-60 h-60 object-cover"
                src={previewImage}
                alt="Preview"
              />
            ) : (
              <AddPhotoAlternateIcon sx={{ fontSize: 80 }} />
            )}
          </label>

          <input
            onChange={getImage}
            className="hidden"
            type="file"
            name="image_uploads"
            id="image_uploads"
            accept=".jpg, .jpeg, .png, .svg"
          />

          <div className="flex flex-col gap-2 w-full px-2">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              required
              name="name"
              id="name"
              placeholder="Enter name..."
              className="bg-transparent px-3 py-2 border rounded-md"
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col gap-2 w-full px-2">
            <label htmlFor="description" className="font-semibold">
              Description
            </label>
            <textarea
              required
              name="description"
              id="description"
              placeholder="Enter description..."
              className="bg-transparent px-3 py-1 border rounded-md resize-none h-24"
              onChange={handleUserInput}
            />
          </div>
        </div>

        {/* Right Section */}
        <form
          noValidate
          onSubmit={createNewAccount}
          className="w-full max-w-lg lg:max-w-none lg:flex-1 lg:w-2/3 flex flex-col gap-4 p-4 rounded-lg bg-white shadow-lg"
        >
          {/* Heading for sm and larger screens */}
          <h1 className="text-center text-2xl font-bold hidden lg:block">
            Create Assets
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 px-2">
              <label htmlFor="type" className="font-semibold">
                Type
              </label>
              <input
                type="text"
                required
                name="type"
                id="type"
                placeholder="Enter type..."
                className="bg-transparent px-3 py-2 border rounded-md"
                onChange={handleUserInput}
              />
            </div>

            <div className="flex flex-col gap-2 px-2">
              <label htmlFor="value" className="font-semibold">
                Value
              </label>
              <input
                type="text"
                required
                name="value"
                id="value"
                placeholder="Enter value..."
                className="bg-transparent px-3 py-2 border rounded-md"
                onChange={handleUserInput}
              />
            </div>

            <div className="flex flex-col gap-2 px-2">
              <label htmlFor="location" className="font-semibold">
                Location
              </label>
              <input
                type="text"
                required
                name="location"
                id="location"
                placeholder="Enter location..."
                className="bg-transparent px-3 py-2 border rounded-md"
                onChange={handleUserInput}
              />
            </div>

            <div className="flex flex-col gap-2 px-2">
              <label htmlFor="owner_id" className="font-semibold">
                Owner Id
              </label>
              <input
                type="text"
                required
                name="owner_id"
                id="owner_id"
                placeholder="Enter owner id..."
                className="bg-transparent px-3 py-2 border rounded-md"
                onChange={handleUserInput}
              />
            </div>

            <div className="flex flex-col gap-2 px-2">
              <label htmlFor="engine_capacity" className="font-semibold">
                Features [Engine Capacity]
              </label>
              <input
                type="text"
                required
                name="engine_capacity"
                id="engine_capacity"
                placeholder="Enter engine capacity..."
                className="bg-transparent px-3 py-2 border rounded-md"
                onChange={handleUserInput}
              />
            </div>

            <div className="flex flex-col gap-2 px-2">
              <label htmlFor="mileage" className="font-semibold">
                Features [Mileage]
              </label>
              <input
                type="text"
                required
                name="mileage"
                id="mileage"
                placeholder="Enter mileage..."
                className="bg-transparent px-3 py-2 border rounded-md"
                onChange={handleUserInput}
              />
            </div>

            <div className="flex flex-col gap-2 px-2">
              <label htmlFor="fuel_tank_capacity" className="font-semibold">
                Features [Fuel Tank Capacity]
              </label>
              <input
                type="text"
                required
                name="fuel_tank_capacity"
                id="fuel_tank_capacity"
                placeholder="Enter fuel tank capacity..."
                className="bg-transparent px-3 py-2 border rounded-md"
                onChange={handleUserInput}
              />
            </div>

            <div className="flex flex-col gap-2 px-2">
              <label htmlFor="variant" className="font-semibold">
                Features [Variant]
              </label>
              <input
                type="text"
                required
                name="variant"
                id="variant"
                placeholder="Enter variant..."
                className="bg-transparent px-3 py-2 border rounded-md"
                onChange={handleUserInput}
              />
            </div>

            <div className="flex flex-col gap-2 px-2">
              <label htmlFor="last_maintenance_date" className="font-semibold">
                Dates [Last Maintenance Date]
              </label>
              <input
                type="date"
                required
                name="last_maintenance_date"
                id="last_maintenance_date"
                className="bg-transparent px-3 py-2 border rounded-md"
                onChange={handleUserInput}
              />
            </div>

            <div className="flex flex-col gap-2 px-2">
              <label htmlFor="next_maintenance_date" className="font-semibold">
                Dates [Next Maintenance Date]
              </label>
              <input
                type="date"
                required
                name="next_maintenance_date"
                id="next_maintenance_date"
                className="bg-transparent px-3 py-2 border rounded-md"
                onChange={handleUserInput}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-md py-2 font-semibold text-lg text-white"
          >
            Create Assets
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateAssets;
