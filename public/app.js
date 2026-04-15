async function search() {
  console.log("search clicked");

  const query = document.getElementById("query").value;
  const location = document.getElementById("location").value;
  const results = document.getElementById("results");

  results.innerHTML = "Loading...";

  try {
    const url = `/api/search?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`;
    console.log("fetching:", url);

    const res = await fetch(url);
    console.log("status:", res.status);

    const text = await res.text();
    console.log("raw response:", text.slice(0, 300));

    const data = JSON.parse(text);

    if (!Array.isArray(data) || data.length === 0) {
      results.innerHTML = "No results found.";
      return;
    }

    results.innerHTML = data.map(place => `<li>${place.name}</li>`).join("");
  } catch (err) {
    console.error(err);
    results.innerHTML = `Error: ${err.message}`;
  }
}