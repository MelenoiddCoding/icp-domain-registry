import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";

actor DomainRegistry {

  type DomainRecord = {
    name : Text;
    canister_id : Text;
  };

  var registry = HashMap.HashMap<Principal, [DomainRecord]>(10, Principal.equal, Principal.hash);
  var domainByName = HashMap.HashMap<Text, DomainRecord>(100, Text.equal, Text.hash);

  public shared ({ caller }) func registerDomain(name : Text, canister_id : Text) : async () {

    let nameLower = Text.toLowercase(name);

    if (Text.size(nameLower) < 3 or nameLower == "") {
      Debug.print("❌ Nombre inválido");
      return;
    };

    if (Text.contains(nameLower, #char '.')) {
      Debug.print("❌ No se permiten puntos en el nombre del dominio");
      return;
    };

    ignore do {
      try {
        let _ = Principal.fromText(canister_id);
      } catch (_err) {
        Debug.print("❌ Canister ID inválido");
        return;
      };
    };

    if (domainByName.get(nameLower) != null) {
      Debug.print("❌ Nombre ya registrado");
      return;
    };

    let record : DomainRecord = {
      name = name;
      canister_id = canister_id;
    };

    domainByName.put(name, record);

    let current = switch (registry.get(caller)) {
      case (?list) list;
      case null [];
    };

    let alreadyOwned = Array.find<DomainRecord>(
      current,
      func(r) { r.name == nameLower },
    );

    if (alreadyOwned != null) {
      Debug.print("❌ Ya tienes ese dominio");
      return;
    };

    let updated = Array.append<DomainRecord>(current, [record]);
    registry.put(caller, updated);

    Debug.print("✅ Dominio registrado con éxito");
  };

  public shared query ({ caller }) func getMyDomains() : async [DomainRecord] {
    switch (registry.get(caller)) {
      case (?list) list;
      case null [];
    };
  };

  public query func getAllDomains() : async [DomainRecord] {
    Iter.toArray(domainByName.vals());
  }

};
