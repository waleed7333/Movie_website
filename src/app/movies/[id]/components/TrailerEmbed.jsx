
const TrailerEmbed = ({ videos  }) => {

  if (!videos || !videos.results) {
    return <p>No trailer available.</p>
  }
  const trailer = videos.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  )

  return (
    <div className="mt-8">
      <h2 className="text-xl md:text-2xl font-semibold">Trailer</h2>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          className="w-full h-[225px] md:h-[450px] mt-4"
          src={`https://www.youtube.com/embed/${videos.results[0].key}`}
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}
export default TrailerEmbed;
