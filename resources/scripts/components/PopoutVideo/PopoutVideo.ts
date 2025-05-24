export default class PopoutVideo extends HTMLElement {
  videoContainer: HTMLElement;

  closeButton: HTMLElement;

  video: HTMLVideoElement;

  playIcon: HTMLElement;

  constructor() {
    super();

    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.closeVideoContainer = this.closeVideoContainer.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
    this.fullCloseVideoContainer = this.fullCloseVideoContainer.bind(this);

    this.videoContainer = this.querySelector('.cc-video-container');
    this.closeButton = this.querySelector('.cc-close-button');
    this.video = this.querySelector('.cc-video');
    this.playIcon = this.querySelector('.cc-play-icon');
  }

  connectedCallback() {
    this.videoContainer.addEventListener('click', (e) => {
      this.togglePlayPause();
      e.stopPropagation();
    });

    this.closeButton.addEventListener('click', (e) => {
      this.closeVideoContainer(e);
      e.stopPropagation();

      if (this.videoContainer.style.width === '100px') {
        this.fullCloseVideoContainer();
      }
    });

    this.video.addEventListener('ended', () => {
      this.playIcon.style.display = 'flex';
      this.video.controls = false;
    });
  }

  togglePlayPause() {
    if (this.video.paused) {
      this.playVideo();
    } else {
      this.pauseVideo();
    }
  }

  closeVideoContainer(e) {
    e.stopPropagation();
    this.videoContainer.style.width = '100px';
    this.video.pause();
    this.playIcon.style.display = 'flex';
    this.video.controls = false;
  }

  fullCloseVideoContainer() {
    this.videoContainer.style.display = 'none';
  }

  playVideo() {
    this.video.play();
    this.playIcon.style.display = 'none';
    this.video.controls = true;
    this.videoContainer.style.width = '300px';
    this.videoContainer.style.display = 'block';
  }

  pauseVideo() {
    this.video.pause();
    this.playIcon.style.display = 'flex';
    this.videoContainer.style.width = '100px';
    this.video.controls = false;
  }
}

/**
 * This is a video popout component that allows the user to play a video in a popout modal.
 *
 * <Custom-PopoutVideo>
 *  <div style="width:100px" class="cc-video-container tw:cursor-pointer tw:fixed tw:bottom-[20px] tw:left-[20px] tw:drop-shadow-lg tw:h-auto tw:z-9999 tw:rounded-lg tw:transform tw:transition-all tw:duration-300 tw:ease-in-out tw:hover:scale-[1.05]">
 *    <div class="tw:relative">
 *      {{ shop.metaobjects.shop_video.shop_video.file.value | video_tag: class: "cc-video tw:w-full tw:h-auto tw:rounded-lg tw:shadow-lg", autoplay: false, controls: false, playsinline: true, poster: shop.metaobjects.shop_video.shop_video.poster.value }}
 *
 *      <div class="cc-play-icon tw:absolute tw:inset-0 tw:flex tw:items-center tw:justify-center tw:bg-black/50 cursor-pointer tw:rounded-lg">
 *        <span class="tw:text-white tw:text-4xl">{% render 'icon-play', width: '50' %}</span>
 *      </div>
 *
 *       <button class="cc-close-button tw:absolute tw:top-2 tw:right-2 tw:text-white tw:bg-black tw:rounded-full tw:px-[6px] tw:py-[6px] tw:flex tw:items-center tw:justify-center">
 *        {% render 'icon-close', width: '15' %}
 *     </button>
 *    </div>
 *  </div>
 * </Custom-PopoutVideo>
 *
 * Replace the Metaobject fields with the appropriate Metaobject or Metafield.
 * And add replace {% render 'icon-play' %} and  {% render 'icon-close' %}
 */
