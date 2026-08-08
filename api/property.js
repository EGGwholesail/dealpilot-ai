export default async function handler(req, res) {
  const key = process.env.RENTCAST_API_KEY;

  if (!key) {
    return res.status(500).json({
      error: "RENTCAST_API_KEY is not configured in Vercel."
    });
  }

  const address = String(req.query.address || "").trim();

  if (!address) {
    return res.status(400).json({
      error: "Address is required."
    });
  }

  const headers = {
    Accept: "application/json",
    "X-Api-Key": key
  };

  try {
    const q = encodeURIComponent(address);

    const [propertyResponse, valuationResponse] = await Promise.all([
      fetch(
        `https://api.rentcast.io/v1/properties?address=${q}&limit=1`,
        { headers }
      ),

      fetch(
        `https://api.rentcast.io/v1/avm/value?address=${q}&compCount=5&lookupSubjectAttributes=true`,
        { headers }
      )
    ]);

    if (!propertyResponse.ok || !valuationResponse.ok) {
      const propertyError = await propertyResponse.text();
      const valuationError = await valuationResponse.text();

      return res.status(
        propertyResponse.status === 401 ||
        valuationResponse.status === 401
          ? 401
          : 502
      ).json({
        error: "RentCast request failed.",
        details: {
          property: propertyError.slice(0, 300),
          valuation: valuationError.slice(0, 300)
        }
      });
    }

    const properties = await propertyResponse.json();
    const valuation = await valuationResponse.json();

    const property = Array.isArray(properties)
      ? properties[0] || {}
      : properties;

    return res.status(200).json({
      property,
      valuation
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message || "Property lookup failed."
    });
  }
}
