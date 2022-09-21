export const config = {
  runtime: 'experimental-edge',
}

export default (req) => new Response('Bot detected.', { status: 400 })
