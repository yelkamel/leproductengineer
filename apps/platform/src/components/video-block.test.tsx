import { allLessons, type Video } from "@lpe/curriculum";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VideoBlock } from "./video-block";

describe("VideoBlock", () => {
  it("shows the placeholder and prep notes while the video is not filmed", () => {
    const video = allLessons[0]!.lesson.video;
    render(<VideoBlock video={video} title="Leçon" />);
    expect(screen.getByText(/Vidéo en préparation · environ \d+ min/)).toBeInTheDocument();
    expect(screen.getByText("Notes de préparation")).toBeInTheDocument();
    expect(screen.queryByTitle("Leçon")).not.toBeInTheDocument();
  });

  it("embeds the video once it is ready", () => {
    const ready: Video = {
      status: "ready",
      embedUrl: "https://www.youtube-nocookie.com/embed/abc",
      minutes: 6,
      prep: allLessons[0]!.lesson.video.prep,
    };
    render(<VideoBlock video={ready} title="Leçon" />);
    expect(screen.getByTitle("Leçon")).toHaveAttribute("src", ready.embedUrl);
  });
});
