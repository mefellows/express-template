#!/bin/bash -e

abort()
{
  echo "Package: an error occurred. Exiting..." >&2
  exit 1
}

function generateBuildReleasePackageName {

	# $1 = application semver build number
	# $2 = Git commit SHA1

	echo -n "$1-${2:0:7}"
}

trap 'abort' 0

DOCKER_REGISTRY=""
APP_NAME=""

GIT_SHA1=$1
if [[ ! $GIT_SHA1 =~ ^[a-f0-9]{40}$ ]];
  then
    echo "Git SHA1 commit in correct format required as first argument"
    exit 1
fi

ENVIRONMENT=$2
if [ -z "$ENVIRONMENT" ];
  then
    echo "Environment variable is required as the second argument"
    exit 1
fi

BUILD_NUMBER=$3
if [ -z "$BUILD_NUMBER" ]
  then
    echo "Build number is required as third argument"
    exit 1
fi

echo ">> Building and Publishing Docker Image"

echo ">> Build docker image: $DOCKER_REGISTRY/$APP_NAME/$APP_NAME:$BUILD_NUMBER"
docker build -t $DOCKER_REGISTRY/$APP_NAME/$APP_NAME:$BUILD_NUMBER .

echo ">> Upload to docker registry"
docker push $DOCKER_REGISTRY/$APP_NAME/$APP_NAME:$BUILD_NUMBER

# TODO: Deploy...

trap : 0
