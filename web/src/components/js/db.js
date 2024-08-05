const db = {
  async listAll(q, callback) {
    try {
      const response = await fetch(`/api/videos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(q),
      });

      if (response.ok) {
        const res = await response.json();
        callback(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async getVideo({ id }, callback) {
    console.log(`--- start /api/video id:${id}...`)
    const response = await fetch(`/api/video`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      const res = await response.json();
      callback(res.data);
    }
  },
};

export default db;
