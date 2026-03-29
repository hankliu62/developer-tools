/**
 * omggif 类型声明
 */
declare module 'omggif' {
  export interface GifReaderOptions {
    /** 是否使用 wasm（如果可用）*/
    wasm?: boolean;
  }

  export interface FrameInfo {
    x: number;
    y: number;
    width: number;
    height: number;
    /** 延迟时间，以百分之一秒为单位 */
    delay: number;
    /** 处置方式 */
    disposal: number;
    /** 是否有透明颜色 */
    transparent?: boolean;
  }

  export class GifReader {
    constructor(data: Uint8Array | ArrayBuffer, options?: GifReaderOptions);

    /** 获取帧数 */
    numFrames(): number;

    /** 获取指定帧的信息 */
    frameInfo(frameIndex: number): FrameInfo;

    /** 解码帧数据到 RGBA 像素数组 */
    decodeAndBlitFrameRGBA(frameIndex: number, pixels: Uint8ClampedArray): void;

    /** 解码帧数据到索引颜色数组 */
    decodeAndBlitFrame(frameIndex: number, pixels: Uint8Array): void;

    /** 获取帧的像素数据（返回原始像素数组） */
    decodeFrame(frameIndex: number, pixels: Uint8ClampedArray): void;

    /** 获取帧数信息 */
    loopCount(): number;

    /** 获取帧速率 */
    frameRate(): number;

    /** 获取宽度 */
    width: number;

    /** 获取高度 */
    height: number;
  }

  export class GifWriter {
    constructor(buffer: ArrayBuffer | Uint8Array, width: number, height: number, options?: object);

    addFrame(
      x: number,
      y: number,
      w: number,
      h: number,
      pixels: Uint8Array | Uint8ClampedArray,
      options?: object
    ): number;

    end(): number;
  }
}
