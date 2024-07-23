export function hasPermission(
  permissions: string,
  requiredPermission: bigint
): boolean {
  const permissionsBigInt = BigInt(permissions); // Convert to BigInt for comparison
  return (permissionsBigInt & requiredPermission) === requiredPermission;
}
