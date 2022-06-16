

onmessage = async function (e) {
    this.self.onmessage = function (e) {
    import("subnetter").then(module => {
        const csv = module.getCsv(e.data.firstName, e.data.lastName, e.data.prefix);
        this.self.postMessage(csv);
      });
    }
}