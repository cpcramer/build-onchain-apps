import { createClient, createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import { ENTRYPOINT_ADDRESS_V06 } from "permissionless";
import { paymasterActionsEip7677 } from "permissionless/experimental";

// const client = createPublicClient({
//   chain: baseSepolia,
//   transport: http(),
// })

const paymasterService = process.env.NEXT_PUBLIC_PAYMASTER_URL!;

export const paymasterClient = createClient({
  chain: baseSepolia,
  transport: http(paymasterService),
}).extend(paymasterActionsEip7677({ entryPoint: ENTRYPOINT_ADDRESS_V06 }));

export async function POST(r: Request) {
  console.log('Running New Paymaster Proxy');

  const req = await r.json();
  const method = req.method;
  const [userOp, entrypoint, chainId] = req.params;

  // Can add willSponsor() check here

  if (method === 'pm_getPaymasterStubData') {
    console.log('running pm_getPaymasterStubData');

    const result = await paymasterClient.getPaymasterStubData(userOp);
    return Response.json({ result });
    // const data = {
    //   id: 1,
    //   jsonrpc: '2.0',
    //   method: 'pm_getPaymasterStubData',
    //   params: [userOp, entrypoint, chainId],
    // };
    // const res = await fetch(`https://keys.coinbase.com`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });

    // if (!res.ok) {
    //   throw new Error(`HTTP error! status: ${res.status}`);
    // }

    // return Response.json(await res.json());
  } else if (method === 'pm_getPaymasterData') {
    // handle pm_getPaymasterData
    console.log('running pm_getPaymasterData');

    const result = await paymasterClient.getPaymasterData({
      userOperation: userOp,
    });
    return Response.json({ result });
  }

  return Response.json({ error: "Method not found" });
}
