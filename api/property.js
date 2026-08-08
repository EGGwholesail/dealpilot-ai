export default async function handler(req, res) {
  const rawKey = process.env.RENTCAST_API_KEY;

  if (!rawKey) {
    return res.status(500).json({
      error: "RENTCAST_API_KEY is not configured in Vercel."
    });
  }

  // Removes accidental spaces/newlines from copied API keys
  const key = String(rawKey).trim();

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

    const propertyResponse = await fetch(
      `https://api.rentcast.io/v1/properties?address=${q}&limit=1`,
      { headers }
    );

    if (!propertyResponse.ok) {
      const message = await propertyResponse.text();

      return res.status(propertyResponse.status).json({
        error:
          `RentCast property lookup failed (${propertyResponse.status}): ` +
          message.slice(0, 250),
        debug: {
          keyLoaded: true,
          keyLength: key.length
        }
      });
    }

    const valuationResponse = await fetch(
      `https://api.rentcast.io/v1/avm/value?address=${q}&compCount=5&lookupSubjectAttributes=true`,
      { headers }
    );

    if (!valuationResponse.ok) {
      const message = await valuationResponse.text();

      return res.status(valuationResponse.status).json({
        error:
          `RentCast valuation failed (${valuationResponse.status}): ` +
          message.slice(0, 250),
        debug: {
          keyLoaded: true,
          keyLength: key.length
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
