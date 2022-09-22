export const config = {
  runtime: 'experimental-edge',
}

export default (req) => new Response('Not Found.', { status: 404 })
