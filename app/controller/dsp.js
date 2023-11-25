'use strict';

const { Controller } = require('egg');

class DSPController extends Controller {
  async digital_filtering() {
    const rawPPGData = this.ctx.request.body;
    const U32RawPPGData = new Uint32Array(rawPPGData);
    const filteredData = await this.ctx.curl(
      'http://dsp_server:8001/api/dsp/digital_filtering',
      {
        method: 'POST',
        contentType: 'json',
        data: U32RawPPGData,
        dataType: 'json',
      }
    );
    const F32RawPPGData = new Float32Array(filteredData.data.data);
    this.ctx.body = { data: Array.from(F32RawPPGData) };
    // this.ctx.body = { data: rawPPGData };
  }
}

module.exports = DSPController;
