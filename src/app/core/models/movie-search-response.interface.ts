
export interface NetflixAvailability {
  isPlayable: boolean;
  availabilityDate: string;
  availabilityStartTime: number;
  unplayableCause?: string;
}

export interface NetflixImage {
  videoId: number;
  url: string;
  type?: string;
  width: number;
  height: number;
  extension: string;
  size: string;
  imageKey: string;
  focalPoint?: string;
}

export interface NetflixGenreTag {
  id: number;
  name: string;
}

export interface NetflixMaturityRating {
  value: string;
  maturityDescription: string;
  specificRatingReason: string;
  maturityLevel: number;
  board: string;
  boardId: number;
  ratingId: number;
  reasons: any[];
}

export interface NetflixMaturity {
  rating: NetflixMaturityRating;
}

export interface NetflixContextualSynopsis {
  text: string;
  evidenceKey: string;
}

export interface NetflixDelivery {
  has3D: boolean;
  hasHD: boolean;
  hasUltraHD: boolean;
  hasHDR: boolean;
  hasDolbyVision: boolean;
  hasDolbyAtmos: boolean;
  has51Audio: boolean;
  quality: string;
  hasAudioAssistive: boolean;
  hasTextClosedCaptions: boolean;
  hasAudioSpatial: boolean;
}

export interface NetflixJawSummary {
  trackIds?: {
    videoId: number;
    trackId_jaw: number;
    trackId_jawEpisode: number;
    trackId_jawTrailer: number;
    trackId: number;
  };
  tags?: NetflixGenreTag[];
  cast?: { id: number; name: string }[];
  creators?: any[];
  directors?: { id: number; name: string }[];
  writers?: { id: number; name: string }[];
  genres?: NetflixGenreTag[];
  availability?: NetflixAvailability;
  contextualSynopsis?: NetflixContextualSynopsis;
  currentContextualSynopsis?: NetflixContextualSynopsis;
  maturity?: NetflixMaturity;
  unifiedEntityId: string;
  id: number;
  type: string;
  isOriginal: boolean;
  liveEvent?: any;
  mostLikedVideoId?: number;
  videoId?: number;
  requestId?: string;
  userRatingRequestId?: string;
  title: string;
  copyright?: string | null;
  releaseYear?: number;
  watched?: boolean;
  hasAudioDescription?: boolean;
  synopsis?: string;
  synopsisRegular?: string;
  hasSensitiveMetaData?: boolean;
  delivery?: NetflixDelivery;
  titleMaturity?: { level: number };
  broadcaster?: { broadcasterName: string | null };
  trailerSummary?: { length: number };
  supplementalMessage?: string;
  supplementalMessageIcon?: string;
  videoMerch?: any;
  seasonAbbr?: string;
  seasonCount?: number;
  numSeasonsLabel?: string;
  episodeCount?: number;
  episodeTitle?: string;
  runtime?: number; 
  logoImage?: NetflixImage;
  backgroundImage?: NetflixImage;
  images?: { [key: string]: NetflixImage }; 
}

export interface NetflixSimpleSummary {
  type: string;
  unifiedEntityId: string;
  id: number;
  isOriginal: boolean;
  liveEvent?: {
    hasLiveEvent: boolean;
  };
}

export interface NetflixTitle {
  availability: NetflixAvailability;
  episodeCount?: number;
  inRemindMeList: boolean;
  jawSummary: NetflixJawSummary;
  queue: {
    available: boolean;
    inQueue: boolean;
  };
  summary: NetflixSimpleSummary;
}

export interface NetflixSuggestionSummary {
  unifiedEntityId: string;
  id: number | null;
  type: string;
  entityId: string;
  name: string;
  isTitleGroup: boolean;
  matchedlocale: string | null;
}

export interface NetflixSuggestion {
  summary: NetflixSuggestionSummary;
}

export interface NetflixApiResponse {
  titles: NetflixTitle[];
  suggestions: NetflixSuggestion[];
}


export interface Movie {
  id: string;
  title: string;
  type: string;
  year?: number;
  synopsis?: string;
  image?: string;
  runtime?: number;
  rating?: string;
  genres?: string[];
  userComment?: string;
  userRating?: number;
}

export interface MovieSearchResponse {
  titles: Movie[];
  suggestions: string[];
  totalResults: number;
  hasMore?: boolean;
}


export interface MovieDetailResponse {
  titleId: string;
  details: NetflixJawSummary;
}
