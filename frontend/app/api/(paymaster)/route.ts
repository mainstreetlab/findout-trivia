import { basePaymasterClient, baseSepoliaPaymasterClient } from '../config';
import { willSponsorPermit, willSponsorBase, willSponsorBaseSepolia } from '../utils';

export async function POST(r: Request) {
  const req = await r.json();
  const method = req.method;
  const [userOp, entrypoint, chainId] = req.params;

  if (!willSponsorPermit({ chainId: parseInt(chainId), entrypoint, userOp })) {
    if (!willSponsorBase({ chainId: parseInt(chainId), entrypoint, userOp })) {
      if (!willSponsorBaseSepolia({ chainId: parseInt(chainId), entrypoint, userOp }){
        return Response.json({ error: 'Not a sponsorable operation' });
      }
    }
  }

  /** 
  if (
    !willSponsorBaseSepolia({ chainId: parseInt(chainId), entrypoint, userOp })
  ) {
    return Response.json({ error: 'Not a sponsorable operation' });
  }
  */

  if (willSponsorPermit({ chainId: parseInt(chainId), entrypoint, userOp })) {
    if (method === 'pm_getPaymasterStubData') {
      const result = await basePaymasterClient.getPaymasterStubData({
      userOperation: userOp,
      });
      return Response.json({ result });
    } else if (method === 'pm_getPaymasterData') {
      const result = await basePaymasterClient.getPaymasterData({
        userOperation: userOp,
      });
      return Response.json({ result });
    }
  }
 
  if (willSponsorBase({ chainId: parseInt(chainId), entrypoint, userOp })) {
    if (method === 'pm_getPaymasterStubData') {
      const result = await basePaymasterClient.getPaymasterStubData({
      userOperation: userOp,
      });
      return Response.json({ result });
    } else if (method === 'pm_getPaymasterData') {
      const result = await basePaymasterClient.getPaymasterData({
        userOperation: userOp,
      });
      return Response.json({ result });
    }
  }
    
  if (willSponsorBaseSepolia({ chainId: parseInt(chainId), entrypoint, userOp }){
    if (method === 'pm_getPaymasterStubData') {
      const result = await baseSepoliaPaymasterClient.getPaymasterStubData({
        userOperation: userOp,
      });
      return Response.json({ result });
    } else if (method === 'pm_getPaymasterData') {
      const result = await baseSepoliaPaymasterClient.getPaymasterData({
        userOperation: userOp,
      });
      return Response.json({ result });
    }
  }
  return Response.json({ error: 'Method not found' });
}