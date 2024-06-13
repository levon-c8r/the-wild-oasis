import supabase from "./supabase.js";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error ?? "Cabins could not be loaded");
    throw new Error("Cabins could not be loaded");
  }

  return cabins;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error ?? "Cabins could not be deleted");
    throw new Error("Cabins could not be deleted");
  }

  return data;
}

export async function createEditCabin(cabin, id) {
  const hasImagePath = cabin?.image?.startsWith?.(import.meta.env.VITE_SUPABASE_URL);

  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? cabin.image
    : `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) {
    query = query.insert([{ ...cabin, image: imagePath }]);
  }

  if (id) {
    query = query.update({ ...cabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error ?? "Cabins could not be created");
    throw new Error("Cabins could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
