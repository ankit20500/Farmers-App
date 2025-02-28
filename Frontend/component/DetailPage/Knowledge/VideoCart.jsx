function VideoCart(){
    const videoTutorials = [
        {
          title: "How to Increase Wheat Production",
          videoUrl: "https://www.youtube.com/embed/XYZ123", // Replace with actual YouTube link
        },
        {
          title: "Organic Farming Techniques",
          videoUrl: "https://www.youtube.com/embed/ABC456", // Replace with actual YouTube link
        },
        {
          title: "Modern Tractor Usage",
          videoUrl: "https://www.youtube.com/embed/DEF789", // Replace with actual YouTube link
        },
      ];

    return(
        <section className="section">
        <h3>🎥 Video Tutorials & Expert Advice</h3>
        <div className="grid">
          {videoTutorials.map((video, index) => (
            <div key={index} className="video-card">
              <iframe
                width="100%"
                height="200"
                src={video.videoUrl}
                title={video.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <h4>{video.title}</h4>
            </div>
          ))}
        </div>
      </section>
    )
}

export default VideoCart;