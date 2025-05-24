export interface SkyMapParams {
  object?: string;
  ra?: number;
  dec?: number;
  zoom?: number;
  show_grid?: boolean;
  show_constellation_lines?: boolean;
  show_constellation_boundaries?: boolean;
  box_color?: string;
  box_width?: number;
  box_height?: number;
}

export function parseSkyMapParams(): SkyMapParams {
  const params = new URLSearchParams(window.location.search);
  
  return {
    object: params.get('object') || undefined,
    ra: params.get('ra') ? parseFloat(params.get('ra')!) : undefined,
    dec: params.get('dec') ? parseFloat(params.get('dec')!) : undefined,
    zoom: params.get('zoom') ? parseInt(params.get('zoom')!) : undefined,
    show_grid: params.get('show_grid') === '1',
    show_constellation_lines: params.get('show_constellation_lines') === '1',
    show_constellation_boundaries: params.get('show_constellation_boundaries') === '1',
    box_color: params.get('box_color') || undefined,
    box_width: params.get('box_width') ? parseInt(params.get('box_width')!) : undefined,
    box_height: params.get('box_height') ? parseInt(params.get('box_height')!) : undefined,
  };
}

export function createSkyMapUrl(params: SkyMapParams): string {
  const searchParams = new URLSearchParams();
  
  if (params.object) searchParams.set('object', params.object);
  if (params.ra !== undefined) searchParams.set('ra', params.ra.toString());
  if (params.dec !== undefined) searchParams.set('dec', params.dec.toString());
  if (params.zoom !== undefined) searchParams.set('zoom', params.zoom.toString());
  if (params.show_grid) searchParams.set('show_grid', '1');
  if (params.show_constellation_lines) searchParams.set('show_constellation_lines', '1');
  if (params.show_constellation_boundaries) searchParams.set('show_constellation_boundaries', '1');
  if (params.box_color) searchParams.set('box_color', params.box_color);
  if (params.box_width) searchParams.set('box_width', params.box_width.toString());
  if (params.box_height) searchParams.set('box_height', params.box_height.toString());
  
  return `${window.location.pathname}?${searchParams.toString()}`;
} 